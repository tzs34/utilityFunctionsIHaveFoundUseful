import React from 'react'
import { FlexRow, BlockSpan } from '../../styles'

const PDFContainer = FlexRow.extend`
  width: 300px;
  height: 100px;
  padding: 1em;
  border: 2px solid #eceff1;
  background-color: #ffffff;
  cursor: pointer;
`
const PDFLogo = BlockSpan.extend`
  color: #ffffff;
  background: ${props => (props.type === 'pdf' ? '#D32F2F' : '#43A047')};
  width: 150px;

  line-height: 75px;
`

const PDFTitle = BlockSpan.extend`
  font-size: 1.2em;
  color: #0071bc;
  background: #ffffff;
  width: 300px;
  text-align: left;
  padding: 0.2em;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PDFSize = BlockSpan.extend`
  font-size: 1.2em;
  color: #000000;
  background: #ffffff;
`
const PDFItemRenderer = ({ title, link, size }) => {
  let format = link.substr(-3).toLowerCase()
  return (
    <PDFContainer>
      <PDFLogo type={format}>{format}</PDFLogo>
      <PDFTitle>{title}</PDFTitle>
      <PDFSize>{`(${size}Mb)`}</PDFSize>
    </PDFContainer>
  )
}

export default PDFItemRenderer
