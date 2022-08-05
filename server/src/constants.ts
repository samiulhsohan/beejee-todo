export const __prod__ = process.env.NODE_ENV === 'production'
export const PORT = process.env.PORT || 3000
export const cookieDomain = __prod__ ? '.samiulhsohan.com' : undefined
