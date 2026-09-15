import { card, type CardVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

const slots = card();

export interface CardProps extends ComponentProps<"div">, CardVariants {
  render?: RenderProp;
}

function CardRoot({
  variant = "ghost",
  elevation = "sm",
  interactive = false,
  className,
  render,
  ...props
}: CardProps) {
  return renderElement(
    "div",
    {
      ...props,
      "data-variant": variant,
      className: card({ variant, elevation, interactive }).root({ class: className }),
    },
    render,
  );
}

export interface CardPartProps extends ComponentProps<"div"> {
  render?: RenderProp;
}

function CardHeader({ className, render, ...props }: CardPartProps) {
  return renderElement("div", { ...props, className: slots.header({ class: className }) }, render);
}

export interface CardTitleProps extends ComponentProps<"h3"> {
  render?: RenderProp;
}

function CardTitle({ className, render, ...props }: CardTitleProps) {
  return renderElement("h3", { ...props, className: slots.title({ class: className }) }, render);
}

export interface CardDescriptionProps extends ComponentProps<"p"> {
  render?: RenderProp;
}

function CardDescription({ className, render, ...props }: CardDescriptionProps) {
  return renderElement(
    "p",
    { ...props, className: slots.description({ class: className }) },
    render,
  );
}

function CardBody({ className, render, ...props }: CardPartProps) {
  return renderElement("div", { ...props, className: slots.body({ class: className }) }, render);
}

function CardFooter({ className, render, ...props }: CardPartProps) {
  return renderElement("div", { ...props, className: slots.footer({ class: className }) }, render);
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
