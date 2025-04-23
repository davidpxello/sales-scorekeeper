import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6 flex flex-col items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6 flex items-center justify-center gap-2">
          <RocketIcon className="h-6 w-6" /> Daily Scorekeeper
        </h1>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            ["prospects", "Prospects added (10 = 1pt)"],
            ["calls", "Calls with correct contact"],
            ["emails", "Value emails to Directors (5 = 1pt)"],
            ["meetings", "Initial meetings booked"],
            ["opportunities", "Opportunities created"],
            ["development", "Hours of personal development"],
          ].map(([name, label]) => (
            <div key={name} className="space-y-1">
              <Label htmlFor={name} className="text-sm font-semibold text-gray-700">{label}</Label>
              <Input
                id={name}
                name={name}
                type="number"
                min="0"
                value={form[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          ))}
        </CardContent>
        <div className="text-center mt-8">
          <p className="text-xl font-semibold text-gray-800">Total Points: <span className="text-indigo-600">{points}</span></p>
          <div className="mt-2 mb-1">
            <Progress value={percentage} className="h-4 rounded-full bg-gray-200" />
          </div>
          <p className={points >= goal ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {points >= goal ? "Goal met! 🎉" : `You're ${goal - points} point(s) away from your goal.`}
          </p>
        </div>
        <div className="text-center mt-6">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg">
            Save Today’s Progress
          </Button>
        </div>
      </Card>
    </div>
  );
}