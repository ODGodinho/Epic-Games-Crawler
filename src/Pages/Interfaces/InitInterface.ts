export interface HCaptcha {
    plan_name: string;
    site_key: string;
}

export interface Plan {
    mode: string;
    h_captcha: HCaptcha;
}

export interface HCaptchaConfig {
    sdk_base_url: string;
}

export interface Config {
    h_captcha_config: HCaptchaConfig;
}

export interface Session {
    version: number;
    id: string;
    flow_id: string;
    ip_address: string;
    timestamp: string;
    plan: Plan;
    config: Config;
}

export default interface InitInterface {
    session: Session;
    signature: string;
}
