import React from 'react';

import Content from './content';
import LatestNews from './news';
import Testimonials from './testimonials';
import Form from './form';
import FAQs from './faqs';
import SavingsCalculator from './savings_calculator';
import ContentSections from './content_sections';
import FeaturedSections from './featured_section';
import PricingBlock from './pricing';
import ContentBox from './content_box';
import CTABlock from './cta';
import TableBlock from './table';

const Block = ({
	component, data
}) => {
	switch (component) {
		case `content_block`:
			return <Content {...data} />;
		case `latest_news`:
			return <LatestNews {...data} />;
		case `testimonials_block`:
			return <Testimonials {...data} />;
		case `form_block`:
			return <Form {...data} />;
		case `featured_faqs`:
			return <FAQs {...data} />;
		case `savings_calculator`:
			return <SavingsCalculator {...data} />;
		case `content_sections`:
			return <ContentSections {...data} />;
		case `featured_sections`:
			return <FeaturedSections {...data} />;
		case `pricing`:
			return <PricingBlock {...data} />;
		case `content_box`:
			return <ContentBox {...data} />;
		case `cta_button`:
			return <CTABlock {...data} />;
		case `table`:
			return <TableBlock {...data} />;
		default:
			return <h2>{component}</h2>;
	}
};

export default Block;
