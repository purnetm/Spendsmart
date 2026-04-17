"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoriesTab } from "@/components/spend/categories-tab";
import { SubscriptionsTab } from "@/components/spend/subscriptions-tab";
import { TrendsTab } from "@/components/spend/trends-tab";

export default function SpendPage() {
  return (
    <div className="px-4 py-4 pb-6">
      <Tabs defaultValue="cats">
        <TabsList className="w-full bg-white/[0.06] rounded-lg p-1 mb-3.5">
          <TabsTrigger
            value="cats"
            className="flex-1 py-1.5 text-[12px] font-body text-white/35 rounded-md data-[active]:bg-white/[0.10] data-[active]:text-white data-[active]:font-semibold"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger
            value="subs"
            className="flex-1 py-1.5 text-[12px] font-body text-white/35 rounded-md data-[active]:bg-white/[0.10] data-[active]:text-white data-[active]:font-semibold"
          >
            Subscriptions
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="flex-1 py-1.5 text-[12px] font-body text-white/35 rounded-md data-[active]:bg-white/[0.10] data-[active]:text-white data-[active]:font-semibold"
          >
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cats">
          <CategoriesTab />
        </TabsContent>
        <TabsContent value="subs">
          <SubscriptionsTab />
        </TabsContent>
        <TabsContent value="trends">
          <TrendsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
