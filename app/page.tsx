"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, RefreshCcw, Minus, Plus, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeMixedCase, setIncludeMixedCase] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyz";

    if (includeMixedCase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%&*_-+=?";

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generated);
  }, [length, includeNumbers, includeSymbols, includeMixedCase]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const getStrength = () => {
    if (length >= 12 && includeNumbers && includeSymbols && includeMixedCase) {
      return "Strong";
    }
    return "Weak";
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl p-8 rounded-3xl shadow border border-neutral-200 bg-white space-y-8">
        {/* Password Display */}
        <div className="flex items-center justify-between border border-green-400 rounded-2xl px-6 py-6">
          <h1 className="text-3xl font-bold tracking-wide break-all">{password}</h1>

          <Button
            onClick={copyToClipboard}
            className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full px-6 py-6 text-lg font-semibold shadow-md"
          >
            <Copy className="mr-2 h-5 w-5" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">Generated Password</h2>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 px-4 py-1 text-sm rounded-full"
            >
              {getStrength()}
            </Badge>
          </div>

          <Button
            variant="outline"
            onClick={generatePassword}
            className="rounded-full px-6 py-6 text-lg font-semibold"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Refresh
          </Button>
        </div>

        {/* Length Slider */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Password Length</span>
            <span className="text-xl font-bold">{length}</span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setLength((prev) => Math.max(4, prev - 1))}
              className="rounded-full"
            >
              <Minus />
            </Button>

            <Slider
              value={[length]}
              min={4}
              max={32}
              step={1}
              onValueChange={(value) => setLength(value[0])}
              className="flex-1"
            />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setLength((prev) => Math.min(32, prev + 1))}
              className="rounded-full"
            >
              <Plus />
            </Button>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-10 pt-4">
          <Option label="Numbers" checked={includeNumbers} onChange={setIncludeNumbers} />

          <Option label="Symbols" checked={includeSymbols} onChange={setIncludeSymbols} />

          <Option label="Mixed case" checked={includeMixedCase} onChange={setIncludeMixedCase} />
        </div>
      </Card>
    </div>
  );
}

function Option({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-lg font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <Switch checked={checked} onCheckedChange={onChange} />
        {checked && <Check className="text-blue-600 w-5 h-5" />}
      </div>
    </div>
  );
}
