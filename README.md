# Instagram's Private Mobile API Reversed

This repo includes the source code for Instagram's login request on their mobile API, no silent flags, completely undetected. The rest of the functions inside modules/Instagram.js have been redacted, you can contact me on **Telegram @Hartman50** to gain access to the redacted functions. Full access to this project contains fully reversed Instagram Bloks API, GraphQL API, along with all related algos and functions fully-reversed and undetected. 

**Instagram register endpoint will be opensourced at 50 stars.**

# Data Obtained from Login Response

- x-ig-www-claim
- authorization-token
- ig-u-rur
- ig-u-shbid
- ig-u-shbts
- ig-u-ds-user-id
<img width="1000" alt="image" src="https://media.discordapp.net/attachments/1196498726919876628/1266485333269286952/Screenshot_2024-07-26_at_3.40.35_PM.png?ex=66a551e1&is=66a40061&hm=125bf0acc77360d37542973040d20c2acaf1157efba215607965c1043c7fb9d6&=&format=webp&quality=lossless&width=1868&height=234">

# Project Functions

Includes a complete Instagram request signer + GraphQL and Bloks request signer.

```js
class Instagram {
    async login(username, password) {} // the only opensource part

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

    async fetchDirectMessages(state) {}

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

    async registerDevice(platform) {}
}
```

# Contact

Contact me on Telegram below to obtain full-access.

Telegram - @Hartman50
