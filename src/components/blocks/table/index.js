import React from 'react';

import Block from "../../parts/block";

import './style.scss';

const TableBlock = ({
	heading, content, table
}) => (
	<Block
		className='table_block'
	>
		<h2>{heading}</h2>
		<div dangerouslySetInnerHTML={{ __html: content }} />
		<div className="table">
			<table>
				{table.thead
				&& <thead>
					<tr>
						{table.thead.map(({ value }) => (
							<th>{value}</th>
						))}
					</tr>
				</thead>
				}
				<tbody>
					{table.tbody.map(({ body }) => (
						<tr>
							{body.map(({ value }) => (
								<td>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</Block>
);

export default TableBlock;
