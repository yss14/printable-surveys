import * as React from 'react';
import StyledComponentProps from '../types/StyledComponentProps';
import { Childable } from '../types/Childable';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

enum PaperFormat {
	A4 = 'A4'
}

interface PaperFormatDimensions {
	width: string | number;
	height: string | number;
	padding: string | number;
	margin: string | number;
}

const paperFormatMapping = new Map<PaperFormat, PaperFormatDimensions>();
paperFormatMapping.set(PaperFormat.A4, { width: '210mm', height: '297mm', padding: '20mm', margin: '10mm auto' });

interface PageProps extends StyledComponentProps, Childable {
	format?: PaperFormat;
}

class PageComponent extends React.Component<PageProps> {
	render() {
		const { className, children } = this.props;

		return (
			<div className={className}>
				{children}
			</div>
		);
	}
}

const Page = styled(PageComponent) `
	& {
		width: ${props => paperFormatMapping.get(props.format).width};
		min-height: ${props => paperFormatMapping.get(props.format).height};
		padding: ${props => paperFormatMapping.get(props.format).padding};
		margin: ${props => paperFormatMapping.get(props.format).margin};
		border: 1px #D3D3D3 solid;
		border-radius: 5px;
		background: white;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		position: relative;
	}

	@page {
		size: ${props => props.format};
		margin: 0;
	}

	@page:right{
		@bottom-right {
		  content: counter(page);
		}
	}

	@media print {
		html, body {
			width: ${props => paperFormatMapping.get(props.format).width};
			height: ${props => paperFormatMapping.get(props.format).height};
		}

		& {
			margin: 0;
			border: initial;
			border-radius: initial;
			width: initial;
			min-height: initial;
			box-shadow: initial;
			background: initial;
			page-break-after: always;
		}
	}
`;

Page.propTypes = {
	format: PropTypes.oneOf(Object.keys(PaperFormat).map(k => PaperFormat[k])).isRequired
};

Page.defaultProps = {
	format: PaperFormat.A4
};

export default Page;