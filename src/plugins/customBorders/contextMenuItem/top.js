import {checkSelectionBorders, markSelected} from './../utils';

export default function top(customBordersPlugin) {
  return {
    key: 'borders:top',
    name() {
      let label = 'Top';
      let hasBorder = checkSelectionBorders(this, 'top');
      if (hasBorder) {
        label = markSelected(label);
      }

      return label;
    },
    callback() {
      let hasBorder = checkSelectionBorders(this, 'top');
      customBordersPlugin.prepareBorder(this.getSelectedRange(), 'top', hasBorder);
    }
  };
}