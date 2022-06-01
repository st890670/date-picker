# Date Picker
## Introduce

It's a side project for **practice**. Try to implement a date picker **without any date dependency** such like Day.js or Moment.js. You can change date by updating input value or selecting date from calendar.

![](https://i.imgur.com/Y0NZSpsm.png)

## Demo

[Demo Link](https://jasonjiang.info/date-picker)

## Tech Stack
- Framework: Create React App
- Css processor: Tailwind CSS
- Icon: Font Awesome
- Redux: redux, redux toolkit, redux saga
- Git: husky and commitlint

## API document

| Name | Type | default | description |
| :---: | :---: | :---: | :---: |
| defaultDate | Date | new Date() | default value for setup input and calendar  |
| onSelectDate | ({year, month, day})=> void |  | callback when select a date from calendar  |
| onInputChange | ({year, month, day})=> void |  | callback when input value change. It will trigger when valid date value filled in input |
| inputContainerClass | string | "" | input container className |
| calendarContainerClass | string | "" | calendar container className |