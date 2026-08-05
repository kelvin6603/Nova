import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ChemistryChartProps {
  data: {
    lifestyle: number;
    interests: number;
    goals: number;
    personality: number;
  };
}

export function ChemistryChart({ data }: ChemistryChartProps) {
  const chartData = [
    { subject: 'Lifestyle', score: data.lifestyle },
    { subject: 'Interests', score: data.interests },
    { subject: 'Goals', score: data.goals },
    { subject: 'Personality', score: data.personality },
  ];

  return (
    <div className="h-48 w-full -ml-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#3f3f46" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 500 }} 
          />
          <Radar
            name="Chemistry"
            dataKey="score"
            stroke="#f43f5e"
            fill="#f43f5e"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
