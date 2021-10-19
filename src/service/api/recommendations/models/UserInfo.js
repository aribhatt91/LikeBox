/* 
{
    "visitorId": string*,
    "userId": string,
    "ipAddress": string,
    "userAgent": string,
    "directUserRequest": boolean
} 
*/

export default function UserInfo(visitorId, ...rest){
    return {
        visitorId,
        ...rest
    }
}