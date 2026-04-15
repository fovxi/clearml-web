import { Injectable } from '@angular/core';

export interface Error {
  meta: {
    result_code: number;
    result_subcode: number;
    result_msg: string;
    error_data?: any;
  };
  data: any;
}
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  template(strings, ...keys) {
    return (values => {
      const result = [strings[0]];
      keys.forEach((key, i) => {
        const value = values[key];
        result.push(value, strings[i + 1]);
      });
      return result.join('');
    });
  }

  private codes = {
    400: {
      12: this.template`字段值超出允许范围`,
      50: this.template`账户已达到凭证数量上限。`,
      51: this.template`当前无法完成此操作。请稍后重试。\n${'resultMsg'}`,
      52: this.template`无法完成身份验证。身份提供方可能不可用，请稍后重试`,
      53: this.template`无法完成身份验证。身份提供方可能不可用，请稍后重试`,
      54: this.template`无法解析链接目标。请联系向你提供该链接的人以加入其团队。`,
      55: this.template`无法完成身份验证。你的注册会话可能已超时，请重试。
** 如果此问题持续出现，身份提供方可能不可用，请稍后再试。`,
      56: this.template`${'user_name'} 团队的邀请已过期。请联系 ${'user_name'} 加入其团队，或注册一个免费的独立账户。`,
      57: this.template`此 ${'provider'} 身份已存在对应账户。请改用“登录”。`,
      58: this.template`账户不存在。请使用你注册时使用的身份提供方，或先注册创建新账户`,
      62: this.template`请检查你的邮箱以继续完成注册流程`,
      67: this.template`${'email'} 无权访问该服务，请联系管理员将该地址加入白名单`,
      86: this.template`无法停用最后一个 SSO 配置`,
      92: this.template`无法登录租户 ${'tenant'}，当前用户不属于该租户`,
      1205: this.template`该工作区已达到并发运行实例数量上限。`,
      505: this.template`该版本当前已关联一个或多个标注任务 ${'tasks'}`,
      509: this.template`无法编辑已发布版本的帧元数据。`
    }
  };

  getErrorMsg(error: Error, extraParams: Record<string, string> = {}) {
    const template = this.codes?.[error?.meta?.result_code]?.[error?.meta?.result_subcode];
    if (template) {
      let params = {resultMsg: error?.meta?.result_msg, ...extraParams};
      if (error?.meta?.error_data) {
        params = {...error.meta.error_data, ...params};
      }
      try {
        return template(params);
      } catch {
        console.warn('failed to render error message', error);
      }
    }
    return error?.meta?.result_msg || '';
  }

  lastRunError(error: Error) {
    return error?.meta?.result_code === 400 && error?.meta?.result_subcode === 160;
  }
}
