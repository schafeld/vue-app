<script setup lang="ts">
const links = [
  {
    title: "Dashboard",
    to: "/",
    icon: "lucide:house",
  },
  {
    title: "Projects",
    to: "/projects",
    icon: "lucide:building-2",
  },
  {
    title: "Tasks",
    to: "/tasks",
    icon: "lucide:badge-check",
  },
];
const accountLinks = [
  {
    title: "Profile",
    to: "/profile",
    icon: "lucide:user",
  },
  // {
  //   title: "Chat",
  //   to: "/chat",
  //   icon: "lucide:message-square",
  // },
  {
    title: "Settings",
    to: "/settings",
    icon: "lucide:settings",
  },
  {
    title: "Sign out",
    icon: "lucide:log-out",
  },
];

const router = useRouter();

const handleLinkClick = async (title: string) => {
  // console.log(`Link clicked: ${title}`);
  if (title === "Sign out") {
    const { logout } = await import("@/utils/supabaseAuth");
    const isLoggedOut = await logout();

    if (isLoggedOut) {
      router.push("/login");
    }
  }
};
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center px-2 lg:px-4 shrink-0 gap-1 justify-between">

      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon" class="w-8 h-8">
          <iconify-icon icon="lucide:plus"></iconify-icon>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          Task
        </DropdownMenuItem>
        <DropdownMenuItem>
          Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>




      <!-- <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button> -->
    </div>
    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div class="sidebar-links">
        <SidebarLinks :links="links" />
      </div>
      <div class="absolute bottom-3 w-full">
        <SidebarLinks :links="accountLinks" @link-click="handleLinkClick" />
      </div>
    </nav>
  </aside>
</template>

<style lang="scss" scoped></style>
