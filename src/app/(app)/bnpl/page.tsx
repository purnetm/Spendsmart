"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlansTab } from "@/components/bnpl/plans-tab";
import { CalculatorTab } from "@/components/bnpl/calculator-tab";
import { ScoreSimulatorTab } from "@/components/bnpl/score-simulator-tab";

export default function BNPLPage() {
  return (
    <div className="px-4 py-4 pb-6">
      <Tabs defaultValue="plans">
        <TabsList className="w-full bg-n-100 rounded-md p-1 mb-3.5">
          <TabsTrigger
            value="plans"
            className="flex-1 py-1 text-[12px] font-body text-n-400 rounded-sm data-[active]:bg-white data-[active]:text-n-800 data-[active]:font-semibold data-[active]:shadow-sm"
          >
            My Plans
          </TabsTrigger>
          <TabsTrigger
            value="calc"
            className="flex-1 py-1 text-[12px] font-body text-n-400 rounded-sm data-[active]:bg-white data-[active]:text-n-800 data-[active]:font-semibold data-[active]:shadow-sm"
          >
            Calculator
          </TabsTrigger>
          <TabsTrigger
            value="sim"
            className="flex-1 py-1 text-[12px] font-body text-n-400 rounded-sm data-[active]:bg-white data-[active]:text-n-800 data-[active]:font-semibold data-[active]:shadow-sm"
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
