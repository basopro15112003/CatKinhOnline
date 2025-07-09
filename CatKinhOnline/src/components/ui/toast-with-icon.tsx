import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { Toast, ToastTitle, ToastDescription, ToastClose } from "./toast"
import { cn } from "@/lib/utils"

interface ToastWithIconProps {
  variant?: "default" | "destructive" | "success" | "warning"
  title?: string
  description?: string
  className?: string
}

export function ToastWithIcon({ variant = "default", title, description, className, ...props }: ToastWithIconProps) {
  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-5 w-5 flex-shrink-0" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 flex-shrink-0" />
      case "destructive":
        return <XCircle className="h-5 w-5 flex-shrink-0" />
      default:
        return null
    }
  }

  return (
    <Toast variant={variant} className={cn("flex items-start gap-3", className)} {...props}>
      <div className="flex items-center gap-3 flex-1">
        {getIcon()}
        <div className="flex-1">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
      </div>
      <ToastClose />
    </Toast>
  )
}
