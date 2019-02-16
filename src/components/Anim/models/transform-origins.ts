export enum Transform_Origin {
  UPPER_LEFT = "UPPER_LEFT",
  UPPER_CENTER = "UPPER_CENTER",
  UPPER_RIGHT = "UPPER_RIGHT",

  MIDDLE_LEFT = "MIDDLE_LEFT",
  MIDDLE_CENTER = "MIDDLE_CENTER",
  MIDDLE_RIGHT = "MIDDLE_RIGHT",

  LOWER_LEFT = "LOWER_LEFT",
  LOWER_MIDDLE = "LOWER_CENTER",
  LOWER_CENTER = "LOWER_RIGHT"
}

export function getTransformOrigin(origin: Transform_Origin) {
  switch (origin) {
    case Transform_Origin.UPPER_LEFT:
      return { transformOrigin: ["0% 0% 0%", "0% 0% 0%"] };
    case Transform_Origin.UPPER_CENTER:
      return { transformOrigin: ["50% 0% 0%", "50% 0% 0%"] };
    case Transform_Origin.UPPER_RIGHT:
      return { transformOrigin: ["100% 0% 0%", "100% 0% 0%"] };

    case Transform_Origin.MIDDLE_LEFT:
      return { transformOrigin: ["0% 50% 0%", "0% 50% 0%"] };
    case Transform_Origin.MIDDLE_CENTER:
      return { transformOrigin: ["50% 50% 0%", "50% 50% 0%"] };
    case Transform_Origin.MIDDLE_RIGHT:
      return { transformOrigin: ["100% 50% 0%", "100% 50% 0%"] };

    case Transform_Origin.LOWER_LEFT:
      return { transformOrigin: ["0% 100% 0%", "0% 100% 0%"] };
    case Transform_Origin.LOWER_CENTER:
      return { transformOrigin: ["50% 100% 0%", "50% 100% 0%"] };
    case Transform_Origin.LOWER_RIGHT:
      return { transformOrigin: ["100% 100% 0%", "100% 100% 0%"] };
  }
}
