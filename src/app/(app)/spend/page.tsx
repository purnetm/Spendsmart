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
            className="flex-1 text-[12px] font-body data-[state=active]:bg-white data-[state=active]:text-n-800 data-[state=active]:font-semibold data-[state=active]:shadow-sm data-[state=active]:rounded-sm data-[state=inactive]:text-n-400"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger
            value="subs"
            className="flex-1 text-[12px] font-body data-[state=active]:bg-white data-[state=active]:text-n-800 data-[state=active]:font-semibold data-[state=active]:shadow-sm data-[state=active]:rounded-sm data-[state=inactive]:text-n-400"
          >
            Subscriptions
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="flex-1 text-[12px] font-body data-[state=active]:bg-white data-[state=active]:text-n-800 data-[state=active]:font-semibold data-[state=active]:shadow-sm data-[state=active]:rounded-sm data-[state=inactive]:text-n-400"
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
