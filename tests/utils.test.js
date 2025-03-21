import {decodeROT13} from "./../service/utils.js";

describe('Utility Functions Tests 🛠️', () => {
    describe('Testing decodeROT13 Function 🔄', () => {
        it('should decode a ROT13 encoded string correctly 🎉', () => {
            const encodedText = "Uryyb Jbeyq!"; // "Hello World!" in ROT13
            const decodedText = decodeROT13(encodedText);

            // Check the output after decoding
            expect(decodedText).toBe("Hello World!"); // Expected decoded output
        });

        it('should handle non-alphabetic characters appropriately 🔤', () => {
            const encodedText = "Uryyb, Jbeyq123!"; // "Hello, World123!" in ROT13
            const decodedText = decodeROT13(encodedText);

            // Checking the decoded string with non-alphabetic characters
            expect(decodedText).toBe("Hello, World123!"); // Expected decoded output
        });
    });
});
