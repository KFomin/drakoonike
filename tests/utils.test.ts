import {decodeROT13} from "../service/utils";

describe('Utility Functions Tests 🛠️', () => {
    describe('Testing decodeROT13 Function 🔄', () => {
        it('should decode a ROT13 encoded string correctly 🎉', () => {
            const encodedText: string = "Uryyb Jbeyq!";
            const decodedText: string = decodeROT13(encodedText);

            expect(decodedText).toBe("Hello World!");
        });

        it('should handle non-alphabetic characters appropriately 🔤', () => {
            const encodedText: string = "Uryyb, Jbeyq123!";
            const decodedText: string = decodeROT13(encodedText);

            expect(decodedText).toBe("Hello, World123!");
        });
    });
});
