import React from 'react';

const Progress = ({ progress }) => (
	<svg className="progress" viewBox="0 0 1883 290" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M1762.75 1.72461H1880.18L1842.35 109.286H1875.07L1875.07 109.259L1875.9 109.289L1875.72 119.286H1828.24L1866.07 11.7246H1771.08L1752.15 114.618L1742.32 112.809L1762.75 1.72461ZM941.978 109.067C988.372 140.525 1035.15 172.242 1091.28 189.83C1179.31 217.413 1243.02 175.211 1277.42 152.425C1282.99 148.734 1287.79 145.553 1291.8 143.26C1308.9 133.491 1329.55 133.231 1344.04 142.516C1351.37 147.205 1357.01 154.287 1359.64 163.534C1362.25 172.738 1361.77 183.734 1357.52 196.213C1350.88 215.701 1349.4 228.39 1350.56 237.296C1351.69 245.928 1355.37 251.46 1360.38 256.623C1363.34 259.684 1369.96 263.438 1379.25 265.334C1388.4 267.201 1399.74 267.174 1411.88 263.163C1435.98 255.203 1464.34 231.118 1484.55 171.984C1496.52 136.985 1527.49 98.6945 1564.22 77.6553C1582.64 67.0994 1602.81 60.7172 1622.99 61.5321C1643.28 62.3518 1663.2 70.4448 1680.93 88.1627L1680.93 88.1639C1687.47 94.7045 1692.42 101.094 1697.02 107.033L1697.17 107.236L1697.18 107.239C1703.3 115.154 1708.54 121.855 1715.42 126.587L1715.42 126.588C1722.84 131.7 1731.81 134.245 1744.15 134.245H1787.27L1771.41 278.501H1782.99L1860.18 129.861L1869.06 134.469L1789.07 288.501H1760.25L1776.11 144.245H1744.15C1730.34 144.245 1719.24 141.362 1709.75 134.824L1709.75 134.5V134.825L1709.75 134.824C1701.46 129.119 1695.34 121.214 1689.47 113.616L1689.27 113.36L1690 113L1689.27 113.357L1689.23 113.313C1684.57 107.296 1679.95 101.327 1673.86 95.2339L1673.86 95.235V95L1673.86 95.2339C1657.84 79.2247 1640.27 72.2384 1622.58 71.524C1604.77 70.8047 1586.47 76.4339 1569.19 86.3322C1534.51 106.201 1505.17 142.59 1494.02 175.219C1473.16 236.243 1443.02 263.409 1415.01 272.659C1401.1 277.254 1387.98 277.322 1377.25 275.133C1366.67 272.973 1357.98 268.521 1353.19 263.581C1347.2 257.39 1342.14 249.974 1340.65 238.595C1339.19 227.491 1341.2 213.106 1348.05 192.99C1351.8 181.969 1351.95 173.089 1350.01 166.263C1348.09 159.478 1344.02 154.373 1338.65 150.937C1327.78 143.972 1311.17 143.712 1296.77 151.943C1293.18 153.993 1288.73 156.958 1283.46 160.472C1249.5 183.105 1181.35 228.533 1088.29 199.373C1030.62 181.301 982.147 148.425 935.495 116.78C920.805 106.816 906.296 96.9739 891.736 87.7549C830.639 49.0698 767.842 20.5874 684.164 35.5226C633.683 44.5329 599.019 60.5753 573.754 79.8351C548.482 99.1012 532.315 121.812 519.115 144.665C514.11 153.33 509.571 161.942 505.097 170.431C503.645 173.188 502.199 175.931 500.746 178.66C494.857 189.718 488.884 200.464 482.084 210.284C468.394 230.052 451.238 246.22 424.233 254.387C319.952 285.926 224.562 253.925 167.782 198.169C140.119 171.004 115.112 150.126 89.0932 137.875C63.2782 125.72 36.3053 121.983 4.42886 129.469L2.14258 119.734C36.2662 111.72 65.5432 115.733 93.3532 128.828C120.96 141.827 146.952 163.699 174.789 191.034C229.009 244.277 320.619 275.277 421.338 244.815C445.583 237.483 461.052 223.089 473.863 204.591C480.312 195.278 486.058 184.965 491.919 173.959C493.33 171.31 494.749 168.618 496.186 165.892C500.68 157.364 505.345 148.512 510.456 139.663C524.006 116.203 540.965 92.2573 567.692 71.8824C594.427 51.5013 630.638 34.9183 682.407 25.6782C769.73 10.0924 835.182 40.1105 897.086 79.3061C912.209 88.8817 927.073 98.9609 941.978 109.067Z" class="fill" />
		<path d="M1291.8 143.26C1287.79 145.553 1282.99 148.734 1277.42 152.425C1243.02 175.211 1179.31 217.413 1091.28 189.83C1035.15 172.242 988.372 140.525 941.978 109.067C927.073 98.9609 912.209 88.8817 897.086 79.3061C835.182 40.1105 769.73 10.0924 682.407 25.6782C630.638 34.9183 594.427 51.5013 567.692 71.8824C540.965 92.2573 524.006 116.203 510.456 139.663C505.345 148.512 500.68 157.364 496.186 165.892C494.749 168.618 493.33 171.31 491.919 173.959C486.058 184.965 480.312 195.278 473.863 204.591C461.052 223.089 445.583 237.483 421.338 244.815C320.619 275.277 229.009 244.277 174.789 191.034C146.952 163.699 120.96 141.827 93.3532 128.828C65.5432 115.733 36.2662 111.72 2.14258 119.734L4.42886 129.469C36.3053 121.983 63.2782 125.72 89.0932 137.875C115.112 150.126 140.119 171.004 167.782 198.169C224.562 253.925 319.952 285.926 424.233 254.387C451.238 246.22 468.394 230.052 482.084 210.284C488.884 200.464 494.857 189.718 500.746 178.66C502.199 175.931 503.645 173.188 505.097 170.431C509.571 161.942 514.11 153.33 519.115 144.665C532.315 121.812 548.482 99.1012 573.754 79.8351C599.019 60.5753 633.683 44.5329 684.164 35.5226C767.842 20.5874 830.639 49.0698 891.736 87.7549C906.296 96.9739 920.805 106.816 935.495 116.78C982.147 148.425 1030.62 181.301 1088.29 199.373C1181.35 228.533 1249.5 183.105 1283.46 160.472C1288.73 156.958 1293.18 153.993 1296.77 151.943C1311.17 143.712 1327.78 143.972 1338.65 150.937C1344.02 154.373 1348.09 159.478 1350.01 166.263C1351.95 173.089 1351.8 181.969 1348.05 192.99C1341.2 213.106 1339.19 227.491 1340.65 238.595C1342.14 249.974 1347.2 257.39 1353.19 263.581M1291.8 143.26L1292 143.902M1291.8 143.26C1308.9 133.491 1329.55 133.231 1344.04 142.516C1351.37 147.205 1357.01 154.287 1359.64 163.534C1362.25 172.738 1361.77 183.734 1357.52 196.213C1350.88 215.701 1349.4 228.39 1350.56 237.296C1351.69 245.928 1355.37 251.46 1360.38 256.623C1363.34 259.684 1369.96 263.438 1379.25 265.334C1388.4 267.201 1399.74 267.174 1411.88 263.163C1435.98 255.203 1464.34 231.118 1484.55 171.984C1496.52 136.985 1527.49 98.6945 1564.22 77.6553C1582.64 67.0994 1602.81 60.7172 1622.99 61.5321C1643.28 62.3518 1663.2 70.4448 1680.93 88.1627L1680.93 88.1639C1687.47 94.7045 1692.42 101.094 1697.02 107.033L1697.17 107.236L1697.18 107.239C1703.3 115.154 1708.54 121.855 1715.42 126.587L1715.42 126.588C1722.84 131.7 1731.81 134.245 1744.15 134.245H1787.27L1771.41 278.501H1782.99L1860.18 129.861L1869.06 134.469L1789.07 288.501H1760.25L1776.11 144.245H1744.15C1730.34 144.245 1719.24 141.362 1709.75 134.824M1709.75 134.824L1709.75 134.5V134.825L1709.75 134.824ZM1709.75 134.824C1701.46 129.119 1695.34 121.214 1689.47 113.616L1689.27 113.36L1690 113L1689.27 113.357L1689.23 113.313C1684.57 107.296 1679.95 101.327 1673.86 95.2339M1673.86 95.2339L1673.86 95.235V95L1673.86 95.2339ZM1673.86 95.2339C1657.84 79.2247 1640.27 72.2384 1622.58 71.524C1604.77 70.8047 1586.47 76.4339 1569.19 86.3322C1534.51 106.201 1505.17 142.59 1494.02 175.219C1473.16 236.243 1443.02 263.409 1415.01 272.659C1401.1 277.254 1387.98 277.322 1377.25 275.133C1366.67 272.973 1357.98 268.521 1353.19 263.581M1353.19 263.581H1353.5M1762.75 1.72461H1880.18L1842.35 109.286H1875.07L1875.07 109.259L1875.9 109.289L1875.72 119.286H1828.24L1866.07 11.7246H1771.08L1752.15 114.618L1742.32 112.809L1762.75 1.72461Z" class="outline" />
		<defs>
			<linearGradient id="_ProgressGradient">
				<stop stop-color="#18304c" offset="0" />
				<stop stop-color="#18304c" offset={`${progress}%`} />
				<stop stop-color="#fff" offset={`${progress + 0.1}%`} />
				<stop stop-color="#fff" offset="100%" />
			</linearGradient>
		</defs>
	</svg>

);

export default Progress;
