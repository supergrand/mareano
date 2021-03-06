package no.imr.geoexplorer.printmap.json.pojo;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class PrintLayer {

    private String url;
    private List<BoundingBox> gridBoundingBoxes;
    private int columnSize;
    private List<String> position;
    private List<Legend> legend;
    private String kartlagTitle;
    private String kartlagId;
    private boolean visible;
    
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public List<BoundingBox> getGridBoundingBoxes() {
        return gridBoundingBoxes;
    }
    public void setGridBoundingBoxes(List<BoundingBox> gridBoundingBoxes) {
        this.gridBoundingBoxes = gridBoundingBoxes;
    }
    public int getColumnSize() {
        return columnSize;
    }
    public void setColumnSize(int columnSize) {
        this.columnSize = columnSize;
    }
    public List<String> getPosition() {
        return position;
    }
    public void setPosition(List<String> position) {
        this.position = position;
    }
    public List<Legend> getLegend() {
        return legend;
    }
    public void setLegend(List<Legend> legend) {
        this.legend = legend;
    }
    public String getKartlagTitle() {
        return kartlagTitle;
    }
    public void setKartlagTitle(String kartlagTitle) {
        this.kartlagTitle = kartlagTitle;
    }
    
    public String getKartlagId() {
        return kartlagId;
    }
    public void setKartlagId(String kartlagId) {
        this.kartlagId = kartlagId;
    }
    public boolean isVisible() {
        return visible;
    }
    public void setVisible(boolean visible) {
        this.visible = visible;
    }
    
}
