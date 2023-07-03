import {stringExpandBase} from "./stringExpand";


describe('String expand test', function () {
        it('odd letters count', async () => {
            const textResult = await stringExpandBase("123c456")
            expect(textResult).toEqual("654c321");
        });

        it('an even letters count', async () => {
            const textResult = await stringExpandBase("123456")
            expect(textResult).toEqual("654321");
        });

        it('1 letters count', async () => {
            const textResult = await stringExpandBase("1")
            expect(textResult).toEqual("1");
        });

        it('empty string', async () => {
            const textResult = await stringExpandBase("")
            expect(textResult).toEqual("");
        });
    }
)
