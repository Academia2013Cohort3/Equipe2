var prefabBullet:Transform;
var shootForce:float;
var shots : int = 0;
var maxShots : int = 8;
var shootSound : AudioClip;
function Update()
{
    if(Input.GetButtonDown("Fire1") && shots < maxShots)
    {
        var instanceBullet = Instantiate(prefabBullet, transform.position, Quaternion.identity);
        instanceBullet.rigidbody.AddForce(transform.forward * shootForce);
        audio.PlayOneShot(shootSound);
        shots++;
    }
    else if (shots >= maxShots && Input.GetKeyDown(KeyCode.R))
    {
        shots = 0;
    }
}