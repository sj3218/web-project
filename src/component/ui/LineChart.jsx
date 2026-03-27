import React, { useState } from "react";

const types = ["line", "stackedline"];

const energySources = [
  { name: "Coal", key: "coal" },
  { name: "Oil", key: "oil" },
  { name: "Gas", key: "gas" },
];

function LineChart({data})
{
    const [type, setType] = useState(types[0]);
      const maxY = Math.max(
    ...data.map((c) =>
      type === "stackedline"
        ? energySources.reduce((sum, src) => sum + c[src.key], 0)
        : Math.max(...energySources.map((src) => c[src.key]))
    )
  );

  const width = 600;
  const height = 300;
  const padding = 40;

  const getX = (i) => padding + (i * (width - padding * 2)) / (data.length - 1);
  const getY = (v) => height - padding - (v / maxY) * (height - padding * 2);

  return (
    <div>
      <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
        {/* y축 */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" />
        {/* x축 */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />

        {/* 시리즈 */}
        {energySources.map((src, sIdx) => {
          let points = "";
          data.forEach((c, i) => {
            let value = c[src.key];
            if (type === "stackedline") {
              const prev = energySources.slice(0, sIdx).reduce((sum, p) => sum + c[p.key], 0);
              value += prev;
            }
            points += `${getX(i)},${getY(value)} `;
          });
          const colors = ["blue", "green", "orange"];
          return <polyline key={src.key} fill="none" stroke={colors[sIdx % colors.length]} strokeWidth={2} points={points.trim()} />;
        })}

        {/* x축 라벨 */}
        {data.map((c, i) => (
          <text key={c.country} x={getX(i)} y={height - padding + 15} fontSize={10} textAnchor="middle">
            {c.country}
          </text>
        ))}

        {/* y축 라벨 */}
        {[0.25, 0.5, 0.75, 1].map((v) => (
          <text key={v} x={padding - 5} y={getY(v * maxY)} fontSize={10} textAnchor="end" alignmentBaseline="middle">
            {Math.round(v * maxY)}
          </text>
        ))}
      </svg>

      {/* 타입 선택 */}
      <div style={{ marginTop: 10 }}>
        <label>Series Type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LineChart;