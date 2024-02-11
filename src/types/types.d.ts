import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface NavBarItem {
  name: string;
  icon: IconDefinition;
  link: string;
}

export interface NavBarConfig {
  appName: string;
  items: NavBarItem[];
}
