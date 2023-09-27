package demo.api.dto;

public class ImageDtoIn {
    private Integer image_id;
    private String image_data;
    private String content_type;

    public ImageDtoIn(Integer image_id, String image_data, String content_type) {
        this.image_id = image_id;
        this.image_data = image_data;
        this.content_type = content_type;
    }

    public Integer getImage_id() {
        return image_id;
    }

    public void setImage_id(Integer image_id) {
        this.image_id = image_id;
    }

    public String getImage_data() {
        return image_data;
    }

    public void setImage_data(String image_data) {
        this.image_data = image_data;
    }

    public String getContent_type() {
        return content_type;
    }

    public void setContent_type(String content_type) {
        this.content_type = content_type;
    }

    public ImageDtoIn() {
    }
}
