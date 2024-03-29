import { Box } from '@chakra-ui/react'
import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';

let epNo = 0;

const accessors = {
    xAccessor: d => d.epNo,
    yAccessor: d => d.imdbRating,
};

export default function Graph (props) {
    let seasons = props.props
    console.log(seasons)
    return (
        <Box>
            <XYChart height={700} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
                <AnimatedAxis orientation="left" />
                <AnimatedGrid columns={false} numTicks={4} />
                {seasons.map((season) => {
                    let episodes = season.Episodes.filter(episode => episode.imdbRating !== 'N/A')
                    console.log(episodes)
                    episodes.map(episode => {episode.epNo = epNo; epNo++})
                    if (episodes.length > 0) {
                        return (
                            <AnimatedLineSeries dataKey={"Season " + season.Season} data={episodes} {...accessors} />
                        )
                    }
                })}
                <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showVerticalCrosshair
                showSeriesGlyphs
                renderTooltip={({ tooltipData, colorScale }) => (
                    <div>
                    <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                        {tooltipData.nearestDatum.key}
                    </div>
                    {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                    {', '}
                    {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                    </div>
                )}
                />
            </XYChart>
        </Box>
    )
}
