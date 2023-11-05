import React from "react";
import { render, act } from "@testing-library/react-native";
import AnimatedSkeleton from "./skeleton-card";

jest.useFakeTimers();

describe("AnimatedSkeleton", () => {
  it("runs animation sequence on mount", () => {
    const { getByTestId } = render(<AnimatedSkeleton />);

    // You could provide a testID to the Animated.View to select it here
    const animatedElement = getByTestId("animatedSkeleton");

    // Move time forward to see the animation start
    act(() => {
      jest.advanceTimersByTime(500); // half way through the animation
    });

    // Now you could check if the animation has indeed started
    // This is tricky with native animations as they often don't update the style directly in JS
    // So you would need to mock Animated.timing or check for less direct evidence of the animation running

    // Move time forward to complete the first loop
    act(() => {
      jest.advanceTimersByTime(1000); // completes the sequence
    });

    // Here you would check if the animation loop has completed one cycle
    // Again, it's complicated by useNativeDriver being true

    // Make sure to clean up
    jest.clearAllTimers();
  });
});
