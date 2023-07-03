import React from 'react';
import renderer from 'react-test-renderer';
import {Button} from './button';
import {render, screen, fireEvent} from '@testing-library/react';


describe('Button test', function () {
        it('with text', () => {
            const tree = renderer
                .create(<Button text="Test text"/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('without text', () => {
            const tree = renderer
                .create(<Button/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('disabled', () => {
            const tree = renderer
                .create(<Button disabled={true}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('with loader', () => {
            const tree = renderer
                .create(<Button isLoader={true}/>)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('onClick callback', () => {
            window.alert = jest.fn();
            const message = 'it\'s work!'
            const callback = () => {
                alert(message)
            }
            render(<Button data-testid="test-btn"
                           onClick={callback}/>)
            const btn = screen.getByTestId("test-btn");
            fireEvent.click(btn);
            expect(window.alert).toHaveBeenCalledWith(message);
        });
    }
)
