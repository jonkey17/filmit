import React from 'react';
import SearchBar from './SearchBar';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';


describe('SearchBar', () => {
  let onSearchCallback;

  beforeEach(() => {
    onSearchCallback = jest.fn();
  });

  test('renders without crashing', () => {
    const component = renderer.create(<SearchBar onSearch={onSearchCallback}/>);
  });

  test('input should have empty initial value', () => {
    const searchBar = shallow(<SearchBar onSearch={onSearchCallback}/>);
    const input = searchBar.find('input');
    expect(input.props().value).toBe('');
  });

  test('input should change its value on change event', () => {
    const searchBar = shallow(<SearchBar onSearch={onSearchCallback}/>);
    let input = searchBar.find('input');
    const event = {target: {value: 'myvalue'}};
    input.simulate('change', event);
    input = searchBar.find('input');
    expect(input.props().value).toBe('myvalue');
  });

  test('should call onSearch prop if Enter is pressed with a value', () => {
    const inputValue = 'myvalue';
    const searchBar = shallow(<SearchBar onSearch={onSearchCallback}/>);
    const input = searchBar.find('input');
    const valueEvent = {
      target: {value: inputValue},
      preventDefault: jest.fn()
    };
    input.simulate('change', valueEvent);
    const form = searchBar.find('form');
    form.simulate('submit', {preventDefault: jest.fn()});
    expect(onSearchCallback.mock.calls.length).toBe(1);
    expect(onSearchCallback.mock.calls[0][0]).toBe(inputValue);
  });

  test('it should not call onSearchPerformed if value is empty', () => {
    const searchBar = shallow(<SearchBar onSearch={onSearchCallback}/>);
    const form = searchBar.find('form');
    form.simulate('submit', {preventDefault: jest.fn()});
    expect(onSearchCallback.mock.calls.length).toBe(0);
  })
})