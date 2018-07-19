import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';

describe('header component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />)
  })

  it('should be a thing', () => {
    expect(wrapper).toBeDefined()
  });


  it('should update state when input values are changed', () => {
   const titleInput = wrapper.find('input').first()
   const bodyInput = wrapper.find('input').filterWhere(x => x.props().placeholder === 'Body')
   const submitButton = wrapper.find('button')

   titleInput.simulate('change', { target: { value: 'title 1'}})
   bodyInput.simulate('change', { target: { value: 'body 1'}})

   expect(wrapper.state().title).toEqual('title 1')
   expect(wrapper.state().body).toEqual('body 1')
  })

  it('should call submitIdea when button is clicked', () => {
   wrapper.instance().submitIdea = jest.fn()

   const submitButton = wrapper.find('button')

   submitButton.simulate('click')

   expect(wrapper.instance().submitIdea).toHaveBeenCalled()
   expect(wrapper.instance().submitIdea).toHaveBeenCalledTimes(1)
  })

  it('should call this.props.addToDont and clear state fields when submitIdea is fired', () => {
   const mockFn = jest.fn()
   wrapper = mount(<Header addToDont={ mockFn }/>)

   const titleInput = wrapper.find('input').first()
   const bodyInput = wrapper.find('input').filterWhere(x => x.props().placeholder === 'Body')
   const submitButton = wrapper.find('button')

   titleInput.simulate('change', { target: { value: 'title 1'}})
   bodyInput.simulate('change', { target: { value: 'body 1'}})

   expect(wrapper.state().title).toEqual('title 1')
   expect(wrapper.state().body).toEqual('body 1')

   submitButton.simulate('click')

   expect(wrapper.props().addToDont).toHaveBeenCalled()
   expect(wrapper.props().addToDont).toHaveBeenCalledTimes(1)
   expect(wrapper.state().title).toEqual('')
   expect(wrapper.state().body).toEqual('')
  })

})