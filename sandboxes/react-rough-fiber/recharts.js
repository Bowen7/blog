export const code = /* js */ `
import { RoughSVG } from 'react-rough-fiber';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { data } from './data'
import './style.css'

export default function App() {
  return (
    <RoughSVG>
      <BarChart width={730} height={250} data={data} style={{fontFamily: "'Caveat'"}}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" stroke="#333" />
        <Bar dataKey="uv" fill="#82ca9d" stroke="#333" />
      </BarChart>
    </RoughSVG>
  )
}
`.trim()

export const cssCode = /* css */ `
@font-face {
  font-family: 'Caveat';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/caveat/v17/WnznHAc5bAfYB2QRah7pcpNvOx-pjcB9eIWpZw.woff) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`.trim()

export const dataCode = /* js */ `
export const data = [
  {
    name: 'Page A',
    uv: 9000,
    pv: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
  },
];
`
