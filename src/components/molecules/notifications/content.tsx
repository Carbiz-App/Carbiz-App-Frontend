import CustomButton from "@/components/atoms/button";
import { PopoverContent } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  MarkNotificationsAsRead,
  markSingleNotificationasRead,
  useAppNotificationQuery,
  useMarkAllNotificationAsRead,
} from "@/queries/notifications.query";
import { useModal } from "@/store/useModal";
import { AppNotificationOutput } from "@/types/app-notifications.type";
import moment from "moment";
import { useEffect, useState } from "react";

export const Content = () => {
  const {
    items,
    unreadCount,
    loading,
    loadMore,
    page,
    totalPages,
    refetch,
    all,
  } = useAppNotificationQuery();
  const { modal } = useModal();

  const [selectedNotification, setSelectedNotification] = useState<string[]>(
    []
  );

  const { markNotificationsAsRead, notifcationsReadLoading } =
    MarkNotificationsAsRead();
  const { markSingleNotification, singleNotificationLoading } =
    markSingleNotificationasRead();
  const { setAppNotificationCount } = useModal();
  const { markAllNotificationAsRead, markALlNotificationasReadLoading } =
    useMarkAllNotificationAsRead();

  useEffect(() => {
    if (modal.open) {
      refetch();
    }
  }, [modal.type]);

  // ---------------------------
  // SELECT / UNSELECT HANDLER
  // ---------------------------
  const toggleSelectNotification = (n: AppNotificationOutput) => {
    if (n.isRead) return;

    setSelectedNotification((prev) =>
      prev.includes(n.notificationID)
        ? prev.filter((id) => id !== n.notificationID)
        : [...prev, n.notificationID]
    );
  };

  // ---------------------------
  // MARK AS READ HANDLER
  // ---------------------------
  const handleMarkAsRead = async () => {
    if (!selectedNotification.length) return;

    if (selectedNotification.length === 1) {
      await markSingleNotification({
        variables: { input: selectedNotification[0] },
      });
    } else {
      await markNotificationsAsRead({
        variables: { input: { notificationIds: selectedNotification } },
      });
    }

    await refetch();
    setSelectedNotification([]);
  };

  useEffect(() => {
    if (unreadCount != null) setAppNotificationCount?.(unreadCount);
  }, [unreadCount, setAppNotificationCount]);

  // Filter unread notifications
  const unreadItems = items.filter((i: AppNotificationOutput) => !i.isRead);

  return (
    <PopoverContent className="w-md p-0 shadow-xl rounded-2xl border bg-card overflow-clip">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="font-semibold">Notifications</h2>

        <div className="space-x-2 flex items-center">
          <CustomButton
            size="sm"
            variant="outline"
            disabled={!selectedNotification.length}
            loading={notifcationsReadLoading || singleNotificationLoading}
            onClick={handleMarkAsRead}
          >
            Mark As Read
          </CustomButton>

          <CustomButton
            loading={markALlNotificationasReadLoading}
            size="sm"
            onClick={() => markAllNotificationAsRead()}
          >
            Mark All As Read
          </CustomButton>
        </div>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-muted/40 rounded-none border-b p-2">
          <TabsTrigger value="inbox">{`All (${all})`}</TabsTrigger>
          <TabsTrigger value="unread">{`Unread (${unreadCount})`}</TabsTrigger>
        </TabsList>

        {/* All Notifications */}
        <TabsContent value="inbox" className="max-h-96 overflow-y-auto">
          {items.length === 0 && (
            <p className="text-center p-4 text-muted-foreground">
              No notifications
            </p>
          )}

          {items.map((n: AppNotificationOutput) => {
            const isSelected = selectedNotification.includes(n.notificationID);
            return (
              <div
                key={n.notificationID}
                onClick={() => toggleSelectNotification(n)}
                className={cn(
                  "p-4 flex gap-3 border-b last:border-b-0 transition-all",
                  n.isRead ? "bg-muted/40" : "hover:bg-accent/40",
                  isSelected && "bg-primary/20"
                )}
              >
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{n.subject}</span> -{" "}
                    {n.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {moment(n.date).fromNow()} • {n.account}
                  </p>
                </div>

                {!n.isRead && (
                  <span className="w-2 h-2 bg-primary rounded-full self-center" />
                )}
              </div>
            );
          })}

          {/* Load More only if not last page */}
          {page < (totalPages ?? 0) && (
            <div className="p-2 flex items-center justify-center">
              <CustomButton onClick={loadMore} loading={loading}>
                Load More
              </CustomButton>
            </div>
          )}
        </TabsContent>

        {/* Unread Notifications */}
        <TabsContent value="unread" className="max-h-96 overflow-y-auto">
          {unreadItems.length === 0 ? (
            <p className="text-center p-4 text-muted-foreground">
              No unread notifications
            </p>
          ) : (
            unreadItems.map((n: AppNotificationOutput) => {
              const isSelected = selectedNotification.includes(
                n.notificationID
              );
              return (
                <div
                  key={n.notificationID}
                  onClick={() => toggleSelectNotification(n)}
                  className={cn(
                    "p-4 flex gap-3 border-b last:border-b-0 transition-all",
                    isSelected && "bg-primary/20",
                    "hover:bg-accent/40"
                  )}
                >
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">{n.subject}</span> -{" "}
                      {n.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {moment(n.date).fromNow()} • {n.account}
                    </p>
                  </div>

                  <span className="w-2 h-2 bg-primary rounded-full self-center" />
                </div>
              );
            })
          )}

          {/* Load More only if not last page */}
          {page < (totalPages ?? 0) && unreadItems.length > 0 && (
            <div className="p-2 flex items-center justify-center">
              <CustomButton onClick={loadMore} loading={loading}>
                Load More
              </CustomButton>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PopoverContent>
  );
};
