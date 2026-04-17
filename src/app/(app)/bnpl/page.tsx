"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlansTab } from "@/components/bnpl/plans-tab";
import { CalculatorTab } from "@/components/bnpl/calculator-tab";
import { ScoreSimulatorTab } from "@/components/bnpl/score-simulator-tab";

export default function BNPLPage() {
  return (
    <div className="px-4 py-4 pb-6">
      <Tabs defaultValue="plans">
        <TabsList className="w-full bg-white/[0.06] rounded-lg p-1 mb-3.5">
          <TabsTrigger
            value="plans"
            className="flex-1 py-1.5 text-[12px] font-body text-white/35 rounded-md data-[active]:bg-white/[0.10] data-[active]:text-white data-[active]:font-semibold"
          >
            My Plans
          </TabsTrigger>
          <TabsTrigger
            value="calc"
            className="flex-1 py-1.5 text-[12px] font-body text-white/35 rounded-md data-[active]:bg-white/[0.10] data-[active]:text-white data-[active]:font-semibold"
          >
            Calculator
          </TabsTrigger>
          <TabsTrigger
            value="sim"
            className="flex-1 py-1.5 text-[12px] font-body text-white/35 rounded-md data-[active]:bg-white/[0.10] data-[active]:text-white data-[active]:font-semibold"
          >
            Score Sim
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <PlansTab />
        </TabsContent>
        <TabsContent value="calc">
          <CalculatorTab />
        </TabsContent>
        <TabsContent value="sim">
          <ScoreSimulatorTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
