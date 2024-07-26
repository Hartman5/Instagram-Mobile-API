import Instagram from './modules/Instagram.js';

(async () => {
    const instagram = new Instagram(); // proxyless
    // const instagram = new Instagram('username:password@royal.vital-proxies.com:12321'); // proxied 
    console.log(
        await instagram.login('jfidzu', '5grttqwx!')
    );
})();

/*

All other features are redacted, contact me on Telegram (@Hartman50) for the full version.

Redacted Features:

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

    async submit2FA(code) {}

    async solveInstagramChallenge(anchor, captchaData) {}

*/
