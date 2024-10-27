import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({className = '', children, ...props}) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Example usage
const ExampleCard = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ExampleCard;
