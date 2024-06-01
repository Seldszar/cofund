import { styled } from "~/styled-system/jsx";

export interface WidgetPreviewProps {
  campaignUrl: string;
}

export function WidgetPreview(props: WidgetPreviewProps) {
  const { href } = new URL(`/campaigns/${props.campaignUrl}/widget`, import.meta.env.VITE_BASE_URL);

  return (
    <styled.div css={{ pos: "sticky", top: 0 }}>
      <styled.div css={{ aspectRatio: { lg: "square" }, bgImage: "url('https://picsum.photos/200')", bgSize: "cover", display: "grid", mb: 8, p: 8, rounded: "lg" }}>
        <styled.iframe src={href} css={{ h: 124, w: "full" }} />
      </styled.div>

      <styled.div>
        <styled.label>
          <styled.div css={{ fontWeight: "bold", mb: 2 }}>
            Widget URL
          </styled.div>
          <styled.input type="text" readOnly value={href} onFocus={(event) => event.target.select()} css={{ bg: "neutral.200", px: 4, py: 3, rounded: "lg", w: "full" }} />
        </styled.label>

        <styled.div css={{ fontFamily: "mono", mt: 2, textAlign: "center" }}>
          width: 432px, height: 124px
        </styled.div>
      </styled.div>
    </styled.div>
  )
}
