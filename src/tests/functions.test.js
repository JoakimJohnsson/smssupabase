import {prepareUrl} from "../helpers/functions.jsx";

describe('prepareUrl', () => {
    test('adds https:// if the URL does not start with http://', () => {
        const result = prepareUrl('example.com');
        expect(result).toBe('https://example.com');
    });

    test('does not modify the URL if it starts with http://', () => {
        const result = prepareUrl('http://example.com');
        expect(result).toBe('http://example.com');
    });

    test('returns the URL unchanged if it starts with https://', () => {
        const result = prepareUrl('https://example.com');
        expect(result).toBe('https://example.com');
    });

    test('returns undefined if no URL is provided', () => {
        const result = prepareUrl(undefined);
        expect(result).toBeUndefined();
    });

    test('returns an empty string if an empty string is provided', () => {
        const result = prepareUrl('');
        expect(result).toBe('');
    });
});