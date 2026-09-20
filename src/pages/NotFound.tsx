import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FlaskConical } from "lucide-react";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col bg-background"
    >
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <span className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FlaskConical className="size-7" />
              </span>
              <h1 className="mb-4 text-6xl font-extrabold text-foreground" dir="ltr">
                404
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                {t("notfound.title")}
              </p>
              <Button
                asChild
                className="bg-primary text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                <Link to="/">{t("common.home")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
