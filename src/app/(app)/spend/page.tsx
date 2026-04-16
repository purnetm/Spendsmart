"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoriesTab } from "@/components/spend/categories-tab";
import { SubscriptionsTab } from "@/components/spend/subscriptions-tab";
import { TrendsTab } from "@/components/spend/trends-tab";

export default function SpendPage() {
  return (
    <div className="px-4 py-4 pb-6">
      <Tabs defaultValue="cats">
        <TabsList className="w-full bg-n-100 rounded-md p-1 mb-3.5">
          <TabsTrigger
            value="cats"
            className="flex-1 py-1 text-[12px] font-body text-n-400 rounded-sm data-[active]:bg-white data-[active]:text-n-800 data-[active]:font-semibold data-[active]:shadow-sm"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger
            value="subs"
            className="flex-1 py-1 text-[12px] font-body text-n-400 rounded-sm data-[active]:bg-white data-[active]:text-n-800 data-[active]:font-semibold data-[active]:shadow-sm"
          >
            Subscriptions
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="flex-1 py-1 text-[12px] font-body text-n-400 rounded-sm data-[active]:bg-white data-[active]:text-n-800 data-[active]:font-semibold data-[active]:shadow-sm"
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
