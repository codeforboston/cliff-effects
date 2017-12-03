import BottomButtons from './BottomButtons';
import FormPartsContainer from './FormPartsContainer';
import BottomButton from './BottomButton';
import MassiveToggle from './MassiveToggle';
import FormSubheading from './FormSubheading';
import FormHeading from './FormHeading';
import InlineLabelInfo from './InlineLabelInfo';
import IntervalColumnHeadings from './IntervalColumnHeadings';
import ColumnHeading from './ColumnHeading';
import CashFlowRow from './CashFlowRow';

export {
  BottomButtons,
  FormPartsContainer,
  BottomButton,
  MassiveToggle,
  FormSubheading,
  FormHeading,
  InlineLabelInfo,
  IntervalColumnHeadings,
  ColumnHeading,
  CashFlowRow
};

// ========================================
// MONEY ON INTERVALS COLUMNS COMPONENTS
// ========================================

// Ideas of how to handle a different styling situation (if the designers switch columns)

// If we want more control over placement, we may look into this:
// <Grid textAlign='center' verticalAlign='middle'>
//   <Grid.Row className='inputs-in-right-column'>
//     <Grid.Column className='left-label'>
//       <label>Earned Income</label>
//     </Grid.Column>
//     <Grid.Column className='right-input'>
//       <Input type='number'/>
//     </Grid.Column>
//   </Grid.Row>
// </Grid>

// <Form.Field inline>
//   <span className='column-1-header'>Income Source</span>
//   <div className='right-column'>
//     <span className='Weekly'>Income Source</span>
//     <span className='Monthly'>Income Source</span>
//     <span className='Yearly'>Income Source</span>
//   </div>
//   <Input
//     type='number'
//     onChange={props.setClientProperty}
//     className='right-column'
//     name='Earned Income' placeholder='Earned Income'
//   />
