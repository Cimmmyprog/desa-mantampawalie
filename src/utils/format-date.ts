export const formatDate = (date: Date | string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
    return new Date(date).toLocaleDateString(undefined, options);
};