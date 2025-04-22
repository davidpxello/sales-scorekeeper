import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function Scorekeeper() {
  const [form, setForm] = useState({
    prospects: 0,
    calls: 0,
    emails: 0,
    meetings: 0,
    opportunities: 0,
    development: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const points =
    Math.floor(form.prospects / 10) +
    form.calls +
    Math.floor(form.emails / 5) +
    form.meetings +
    form.opportunities +
    form.development;

  const goal = 8;
  const percentage = Math.min((points / goal) * 100, 100);

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Daily Scorekeeper</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          {[
            ["prospects", "Prospects added to cadence (10 = 1pt)"],
            ["calls", "Calls with correct contact (1 = 1pt)"],
            ["emails", "Value-based emails to Directors (5 = 1pt)"],
            ["meetings", "Initial meetings booked (1 = 1pt)"],
            ["opportunities", "Opportunities created (1 = 1pt)"],
            ["development", "Hours of personal development (1 = 1pt)"],
          ].map(([name, label]) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                type="number"
                min="0"
                value={form[name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="pt-4">
            <p className="text-lg font-semibold">Total Points: {points}</p>
            <Progress value={percentage} className="h-3" />
            <p className={points >= goal ? "text-green-600" : "text-red-600"}>
              {points >= goal ? "Goal met! 🎉" : "Keep going!"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}