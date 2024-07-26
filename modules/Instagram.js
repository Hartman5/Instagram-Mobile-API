import { request, ProxyAgent } from 'undici';
import { v4 } from 'uuid';
import crypto from 'crypto';

function random(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomString = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        randomString += charset[randomIndex]
    }

    return randomString;
}

function dict(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'number') {
            return value.toString();
        }
        return value;
    });
}

function createTimestamp() {
    return String(Math.round((Date.now() / 1000) * 1000) / 1000);
}
 
export default class Instagram {
    constructor(proxy=null) {
        this.proxy = proxy;
        this.values = {};
        this.results = {};
    }

    async __send_request(url, method, headers, body, debug=false) {
        try {
            const parsed_url = new URL(`http://${this.proxy}`);
            this.agent = new ProxyAgent({ uri: `http://${this.proxy}` });
    
            if (parsed_url?.username && parsed_url?.password) {
                this.agent = new ProxyAgent({
                    uri: "http://royal.vital-proxies.com:12321",
                    auth: Buffer.from(`${parsed_url.username}:${parsed_url.password}`).toString("base64"),
                });
            }

            headers = {
                'x-ig-app-locale': 'en_US',
                'x-ig-device-locale': 'en_US',
                'x-ig-mapped-locale': 'en_US',
                'x-pigeon-session-id': `UFS-${v4()}-0`,
                'x-pigeon-rawclienttime': createTimestamp(),
                'x-ig-bandwidth-speed-kbps': '-1.000',
                'x-ig-bandwidth-totalbytes-b': '0',
                'x-ig-bandwidth-totaltime-ms': '0',
                'x-bloks-version-id': 'a346110fb4a15c99b37b5a1bb467d8c3743d9cc71071e1a27c283c83af805962',
                'x-ig-www-claim': '0',
                'x-bloks-is-prism-enabled': 'false',
                'x-bloks-prism-button-version': 'CONTROL',
                'x-bloks-prism-colors-enabled': 'false',
                'x-bloks-prism-font-enabled': 'false',
                'x-ig-attest-params': '{"attestation":[{"version":2,"type":"keystore","errors":[-1013],"challenge_nonce":"","signed_nonce":"","key_hash":""}]}',
                'x-bloks-is-layout-rtl': 'false',
                'x-ig-device-id': v4(),
                'x-ig-family-device-id': v4(),
                'x-ig-timezone-offset': '0',
                //'x-ig-nav-chain': 'com.bloks.www.caa.login.login_homepage:com.bloks.www.caa.login.login_homepage:1:button:1721584686.286::',
                'x-fb-connection-type': 'WIFI',
                'x-ig-connection-type': 'WIFI',
                'x-ig-capabilities': '3brTv10=',
                'x-ig-app-id': '567067343352427',
                priority: 'u=3',
                'user-agent': 'Instagram 341.0.0.0.75 Android (33/13; 560dpi; 1440x2560; Genymobile/Samsung; Galaxy S7; motion_phone_arm64; vbox86; en_US; 623186617)',
                'accept-language': 'en-US',
                //'x-mid': 'Zp1HNgABAAFcV2rRBQkLxmxcmtCX',
                'ig-intended-user-id': '0',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'accept-encoding': 'utf-8',
                host: 'i.instagram.com',
                'x-fb-http-engine': 'Liger',
                'x-fb-client-ip': 'True',
                'x-fb-server-cluster': 'True',
                connection: 'keep-alive',
                ...headers
            }

            if(this.values.token) headers['authorization'] = this.values.token;
            if(this.values.claim) headers['x-ig-www-claim'] = this.values.claim;
            if(this.values.rur) headers['ig-u-rur'] = this.values.rur;
            if(this.values.shbid) headers['ig-u-shbid'] = this.values.shbid;
            if(this.values.shbts) headers['ig-u-shbts'] = this.values.shbts;
            if(this.values.ds_user_id) headers['ig-intended-user-id'] = this.values.ds_user_id;
            if(this.values.ds_user_id) headers['ig-u-ds-user-id'] = this.values.ds_user_id;
    
            if (debug) console.log(headers);
    
            var response = await request(url, {
                method: method,
                headers: headers,
                body: body,
                extraConfiguration: this.agent ? { dispatcher: this.agent } : {}
            });

            if(response.headers['x-ig-set-www-claim']) this.values.claim = response.headers['x-ig-set-www-claim'];
            if(response.headers['ig-set-ig-u-rur']) this.values.rur = response.headers['ig-set-ig-u-rur'];
            if(response.headers['ig-set-ig-u-shbid']) this.values.shbid = response.headers['ig-set-ig-u-shbid'];
            if(response.headers['ig-set-ig-u-shbts']) this.values.shbts = response.headers['ig-set-ig-u-shbts'];
            if(response.headers['ig-set-ig-u-ds-user-id']) this.values.ds_user_id = response.headers['ig-set-ig-u-ds-user-id'];

            try {
                const chunks = [];
                for await (const chunk of response.body) {
                    chunks.push(chunk);
                }
                response.body = Buffer.concat(chunks).toString("utf8");
                return response;
            } catch (error) {
                console.error("Error processing response body:", error);
                return response;
            }
        } catch (error) {
            console.error("Error in __send_request:", error);
            return { error: error.message };
        }
    }

    async login(username, password) {
        try {
            const android_id = `android-${crypto.randomBytes(8).toString('hex')}`
        
            const params = dict({
                client_input_params: {
                    should_show_nested_nta_from_aymh: 0,
                    device_id: android_id,
                    login_attempt_count: 1,
                    secure_family_device_id: "",
                    machine_id: "0",
                    accounts_list: [],
                    auth_secure_device_id: "",
                    has_whatsapp_installed: 0,
                    password: `#PWD_INSTAGRAM_BROWSER:0:&:${password}`,
                    sso_token_map_json_string: "",
                    family_device_id: v4(),
                    fb_ig_device_id: [],
                    device_emails: [],
                    try_num: 1,
                    lois_settings: { lois_token: "", lara_override: "" },
                    event_flow: "login_manual",
                    event_step: "home_page",
                    headers_infra_flow_id: "",
                    openid_tokens: {},
                    client_known_key_hash: "",
                    contact_point: username,
                    encrypted_msisdn: "",
                },
                server_params: {
                    should_trigger_override_login_2fa_action: 0,
                    is_from_logged_out: 0,
                    should_trigger_override_login_success_action: 0,
                    login_credential_type: "none",
                    server_login_source: "login",
                    waterfall_id: v4(),
                    login_source: "Login",
                    is_platform_login: 0,
                    INTERNAL__latency_qpl_marker_id: 36707139,
                    offline_experiment_group: null,
                    is_from_landing_page: 0,
                    password_text_input_id: `${random(6)}:185`,
                    is_from_empty_password: 0,
                    ar_event_source: "login_home_page",
                    //qe_device_id: v4(),
                    username_text_input_id: `${random(6)}:184`,
                    layered_homepage_experiment_group: null,
                    device_id: null,
                    INTERNAL__latency_qpl_instance_id: 1.87880564200312e14,
                    reg_flow_source: "login_home_native_integration_point",
                    is_caa_perf_enabled: 1,
                    credential_type: "password",
                    is_from_password_entry_page: 0,
                    caller: "gslr",
                    family_device_id: null,
                    INTERNAL_INFRA_THEME: "harm_f,default,harm_f",
                    access_flow_version: "F2_FLOW",
                    is_from_logged_in_switcher: 0,
                },
            });

            var res = await this.__send_request(
                "https://i.instagram.com/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/",
                "POST",
                {
                    "x-ig-android-id": android_id,
                    "x-ig-nav-chain": `com.bloks.www.caa.login.login_homepage:com.bloks.www.caa.login.login_homepage:1:button:${createTimestamp()}::`,
                },
                new URLSearchParams({
                    params: params,
                    bk_client_context: dict({
                    bloks_version:
                        "a346110fb4a15c99b37b5a1bb467d8c3743d9cc71071e1a27c283c83af805962",
                    styles_id: "instagram",
                    }),
                    blocks_version_id: 'a346110fb4a15c99b37b5a1bb467d8c3743d9cc71071e1a27c283c83af805962'
                }).toString()
            );

            try {
                const tokenPattern = /Bearer\sIGT:[^\s]+/g;
                const tokens = res.body.match(tokenPattern);
        
                if (tokens) {
                    const cleanedTokens = tokens.map(token => {
                        const index = token.indexOf('\\');
                        return index !== -1 ? token.substring(0, index) : token;
                    });

                    this.values.token = cleanedTokens[0];

                    res = await this.__send_request(
                        'https://i.instagram.com/api/v1/multiple_accounts/get_account_family/',
                        'GET',
                        {
                            'x-ig-nav-chain': `com.bloks.www.caa.login.login_homepage:com.bloks.www.caa.login.login_homepage:1:button:${createTimestamp()}::`
                        },
                        null
                    )

                    return {
                        complete: true,
                        values: this.values
                    }
                } else {
                    return {
                        complete: false,
                        error: 'No tokens found.'
                    }
                }
            } catch (parseError) {
                return {
                    complete: false,
                    error: parseError
                }
            }
        } catch (error) {
            return {
                complete: false,
                error: error
            }
        }
    }
    async authenticateUser2FA(username, password) {}

    async submit2FA(code) {}

    async getProfileData(profileId) {}

    async getPostData(postId) {}

    async getLocationData(location) {}

    async getHashtagData(hashtag) {}

    async fetchFollowers(profileId) {}

    async fetchFollowing(profileId) {}

    async fetchPosts(profileId) {}

    async fetchTaggedPosts(profileId) {}

    async fetchPostComments(postId) {}

    async fetchPostLikes(postId) {}

    async likePost(postId) {}

    async likeStory(storyId) {}

    async commentOnPost(postId, comment) {}

    async followProfile(profileId) {}

    async unfollowProfile(profileId) {}

    async uploadPost(image, caption) {}

    async uploadStory(image) {}

    async uploadAvatar(image) {}

    async search(query) {}

    async getProfileSuggestions() {}

    async fetchDirectMessages() {}

    async createDirectMessageThread(profileId) {}

    async sendDirectMessage(threadId, message) {}

    async fetchDirectMessageThread(threadId) {}

    async resetPassword(email) {}

    async registerPhone(phone) {}

    async verifyPhone(phone, OTP) {}

    async registerEmail(email) {}

    async verifyEmail(email, OTP) {}

    async register(username, password) {}

    async setUserBiography(biography) {}

    async solveInstagramChallenge(anchor, captchaData) {}

    async registerDevice() {}
}