const calculateSavings = (value) => {
	const needle = value * 2,
	 closest = [194, 213, 233, 252, 271, 290, 309, 328, 347, 366, 385, 404, 423, 442, 461, 480, 499, 518, 537, 556, 575, 613, 632, 651, 670, 689, 708, 727, 746, 765, 784, 803, 822, 841, 860, 879, 898, 917, 936, 955, 974, 993, 1012].reduce((a, b) => {
			const aDiff = Math.abs(a - needle),
				bDiff = Math.abs(b - needle);

			if (aDiff == bDiff) {
			// Choose largest vs smallest (> vs <)
				return a > b ? a : b;
			}
			return bDiff < aDiff ? b : a;
		});

	// console.log(closest);

	let saving_amount = 112;

	switch (closest) {
		case 194:
			saving_amount = -2.25;
			break;
		case 213:
			saving_amount = -1.96;
			break;
		case 233:
			saving_amount = -1.68;
			break;
		case 252:
			saving_amount = -1.40;
			break;
		case 271:
			saving_amount = -1.11;
			break;
		case 290:
			saving_amount = -0.83;
			break;
		case 309:
			saving_amount = -0.54;
			break;
		case 328:
			saving_amount = -0.26;
			break;
		case 347:
			saving_amount = 8.37;
			break;
		case 366:
			saving_amount = 112;
			break;
		case 385:
			saving_amount = 215;
			break;
		case 404:
			saving_amount = 319;
			break;
		case 423:
			saving_amount = 423;
			break;
		case 442:
			saving_amount = 526;
			break;
		case 461:
			saving_amount = 630;
			break;
		case 480:
			saving_amount = 734;
			break;
		case 499:
			saving_amount = 837;
			break;
		case 518:
			saving_amount = 910;
			break;
		case 537:
			saving_amount = 921;
			break;
		case 556:
			saving_amount = 931;
			break;
		case 575:
			saving_amount = 942;
			break;
		case 594:
			saving_amount = 952;
			break;
		case 613:
			saving_amount = 963;
			break;
		case 632:
			saving_amount = 973;
			break;
		case 651:
			saving_amount = 984;
			break;
		case 670:
			saving_amount = 995;
			break;
		case 689:
			saving_amount = 1005;
			break;
		case 708:
			saving_amount = 1016;
			break;
		case 727:
			saving_amount = 1026;
			break;
		case 746:
			saving_amount = 1036;
			break;
		case 765:
			saving_amount = 1046;
			break;
		case 784:
			saving_amount = 1056;
			break;
		case 803:
			saving_amount = 1066;
			break;
		case 822:
			saving_amount = 1076;
			break;
		case 841:
			saving_amount = 1086;
			break;
		case 860:
			saving_amount = 1096;
			break;
		case 879:
			saving_amount = 1106;
			break;
		case 898:
			saving_amount = 1116;
			break;
		case 917:
			saving_amount = 1126;
			break;
		case 936:
			saving_amount = 1136;
			break;
		case 955:
			saving_amount = 1146;
			break;
		case 974:
			saving_amount = 1156;
			break;
		case 993:
			saving_amount = 1166;
			break;
		case 1012:
			saving_amount = 1176;
			break;
		case 1031:
			saving_amount = 1186;
			break;
		default:
			saving_amount = 112;
	}

	return saving_amount;
};

export default calculateSavings;
