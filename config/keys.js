const APP_NAME = process.env.APP_NAME
module.exports = { 
    MONGO_CONN_OPTIONS: { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false  },
    JWT_SECRET:'C1yc2EAAAABJQAAAQEA3GEKfHVWCyTNjT4mkL8SyhkGZ/XEa4om9I9ta2n7P/WmoJjf5XSMd039rLQvSG0Su2c3VKZeOBCz3ZNWEwUZgzALC6YjKo0X5XDN8A6+YjM3GX3/sdCvOW8KdvXs5AQmEFGGwYXlNv3d+PpjhMnwsMQe/6Tt4SE3AdS/OGq1VmzC1sW8SIb',
    REFRESH_TOKEN_SECRET:'a/aJRQJ\qV*K9K3!$AABJQAAAQEAqESm63ifFpWshsNsRoRaQllv93ftBh4eM8OZDDPykbgviZrDFeX/IPYKFqghd2G4NjibzVAdYKGQHVV2ySU7FrrfauaMDrdbsWup7s3/77es0OW2bBrDk4tATePGm0HJ2xnUWhos5TNhUKPVjkv62vWzZ8JKtLe2EahVRQ/aq0I28rIayAxCOizyXviu2LYXkRwgfaaiD7FUG9dKJwlwyU3SGkQ1ssTwyquHpptXdAVISMVkd9AJZVDCEIhWQ',
    REFRESH_TOKEN_LIFE:"30d",
    REFRESH_TOKEN_ALGO:"HS256",
    // tokenExpireTime:"4h",
    tokenExpireTime:"20s",
    welcome_email_subject: `Welcome to ${APP_NAME}`, 
    emailUrl:'/api/auth/verify/',
    emailLocalUrl:`/api/auth/verify/`,
    EMAIL_TOKEN_EXPIRY:"12h",
}