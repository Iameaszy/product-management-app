

export const extractCloudinaryPublicId = (url: string) => {
    const publicId = url.match(/avatars\/\w+/);
    if (publicId) return publicId[0];
    return null;
};