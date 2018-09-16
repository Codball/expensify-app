import React from 'react';
import { shallow } from 'enzyme';
import { LogInPage } from '../../components/LogInPage';

test('should correctly render LogInPage', () => {
    const wrapper = shallow(<LogInPage />);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
    const startLogin = jest.fn();
    const wrapper = shallow(<LogInPage startLogin={startLogin} />);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});
