import React from 'react';
import renderer from 'react-test-renderer';
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";


describe('Circle test', function () {
        it('without letter', () => {
            const tree = renderer
                .create(<Circle/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('with letter', () => {
            const tree = renderer
                .create(<Circle letter="l"/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('with head', () => {
            const tree = renderer
                .create(<Circle head="head"/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('with react component in head', () => {
            const tree = renderer
                .create(<Circle head={<Circle/>}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('with tail', () => {
            const tree = renderer
                .create(<Circle tail="tail"/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('with react component in tail', () => {
            const tree = renderer
                .create(<Circle tail={<Circle/>}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('with index', () => {
            const tree = renderer
                .create(<Circle index={0}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('small', () => {
            const tree = renderer
                .create(<Circle isSmall={true}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('state default', () => {
            const tree = renderer
                .create(<Circle state={ElementStates.Default}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('state changing', () => {
            const tree = renderer
                .create(<Circle state={ElementStates.Changing}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('state modified', () => {
            const tree = renderer
                .create(<Circle state={ElementStates.Modified}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

    }
)
